// src/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { login } from '../../store/slices/authSlice';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
// import styles from './Login.module.scss';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { loading, error: authError } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      const result = await dispatch(login(formData));
      if (login.fulfilled.match(result)) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>Welcome back to EtsyClone</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            {authError && (
              <div className={styles.errorMessage}>
                {authError}
              </div>
            )}
            
            <div className={styles.form__group}>
              <Input
                label="Username or Email"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                required
                fullWidth
              />
            </div>
            
            <div className={styles.form__group}>
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                fullWidth
              />
            </div>
            
            <div className={styles.form__actions}>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </div>
            
            <div className={styles.form__footer}>
              <p className={styles.footerText}>
                Don't have an account?{' '}
                <Link to="/register" className={styles.link}>
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;