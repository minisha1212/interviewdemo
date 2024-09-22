import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import Swal from 'sweetalert2'; // Import SweetAlert2


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate(); // For navigation

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      Swal.fire({
        title: 'Success!',
        text: 'Registration successful. Please log in.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/'); // Redirect to login page
      });
      
      
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');

      Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        // navigate('/'); // Redirect to login page
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1>Register</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </div>
            </form>

            {/* Login Link */}
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
