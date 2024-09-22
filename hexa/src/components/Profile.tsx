import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed

interface User {
  id: number;
  name: string;
  email:string;
  password:string;
  // Add other properties if necessary
}



const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    hobby: '',
    birthdate: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Adjust the endpoint as needed
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/profile', user); // Adjust the endpoint as needed
      alert('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">User Profile</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="User Photo"
                    className="img-fluid img-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', marginLeft: '100px' }}
                  />
                  <h3 className="profile-username text-center mt-3">{user.name}</h3>
                  <p className="text-muted text-center">Web Developer</p>
                </div>
              </div>
              <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="hobby" className="col-sm-2 col-form-label">Hobby</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="hobby"
                        value={user.hobby}
                        onChange={handleChange}
                        placeholder="Photography"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="birthdate" className="col-sm-2 col-form-label">Birthdate</label>
                    <div className="col-sm-10">
                      <input
                        type="date"
                        className="form-control"
                        id="birthdate"
                        value={user.birthdate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Gender</label>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderMale"
                          value="male"
                          checked={user.gender === 'male'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="genderMale">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderFemale"
                          value="female"
                          checked={user.gender === 'female'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="genderFemale">
                          Female
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderOther"
                          value="other"
                          checked={user.gender === 'other'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="genderOther">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
