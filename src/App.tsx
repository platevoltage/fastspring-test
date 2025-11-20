import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');

  //const FASTSPRING_USER = "QEHUGHH2QPICEXRTWDML9Q";
  //const FASTSPRING_PW = "jVjcHL56Tr2sqqpMEwNQhA";

  useEffect(() => {
    fastspring.epml.init(String("https://firefallmath.test.onfastspring.com/account/WYMz4fTsQJmmVzGTTpyjhw/TA4Y_9E6RKo"));
  }, []);

  function subManagement() {
    fastspring.epml.paymentManagementComponent(String("EEsEAnsyTOCrEBlNMzX8jQ"), String("en"));
  }

  return (
    <>
      <form>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <label htmlFor="school">School:</label>
        <input
          type="text"
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <br />
      </form>

      <button onClick={subManagement}>Manage Subscription</button>
    </>
  );
}

export default App;
