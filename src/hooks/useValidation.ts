import { useState, useCallback } from 'react';
import { ValidationErrors } from '@/types';

export const useValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  }, []);

  const validateSignupForm = useCallback(
    (formData: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      gender: string;
      mobile: string;
    }): boolean => {
      const newErrors: ValidationErrors = {};

      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.email || !validateEmail(formData.email)) {
        newErrors.email = 'Valid email is required';
      }

      if (!formData.password || !validatePassword(formData.password)) {
        newErrors.password =
          'Password must have 8+ chars, uppercase, lowercase, and special char';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
      }

      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }

      if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Valid 10-digit mobile number required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateEmail, validatePassword]
  );

  const validateLoginForm = useCallback(
    (email: string, password: string): boolean => {
      const newErrors: ValidationErrors = {};

      if (!email || !validateEmail(email)) {
        newErrors.email = 'Valid email is required';
      }

      if (!password) {
        newErrors.password = 'Password is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateEmail]
  );

  return {
    errors,
    validateSignupForm,
    validateLoginForm,
    clearErrors: () => setErrors({}),
  };
};
