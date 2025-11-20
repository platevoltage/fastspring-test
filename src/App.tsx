 
 
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [product, setProduct] = useState('');
  const [hasFirefallAccount, setHasFirefallAccount] = useState(false);
  const [hasFastspringAccount, setHasFastspringAccount] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);


  const FASTSPRING_USER = "QEHUGHH2QPICEXRTWDML9Q";
  const FASTSPRING_PW = "jVjcHL56Tr2sqqpMEwNQhA";
  const encodedAuth = btoa(`${FASTSPRING_USER}:${FASTSPRING_PW}`);
  console.log(encodedAuth);
  const secureKey = "2OAQLZNWSZE3OSLJS2X_FQ"


  useEffect(() => {

    const storedEmail = localStorage.getItem("email");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedSchool = localStorage.getItem("school");
    const storedPassword = localStorage.getItem("password");
    const storedConfirmPassword = localStorage.getItem("confirmPassword");
    const storedProduct = localStorage.getItem("product");

     
    if (storedEmail) {
      setEmail(storedEmail);
      setHasFirefallAccount(true);
      checkAccount(storedEmail);
    }
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedSchool) setSchool(storedSchool);
    if (storedPassword) setPassword(storedPassword);
    if (storedConfirmPassword) setConfirmPassword(storedConfirmPassword);
    if (storedProduct) setProduct(storedProduct);

    
    fastspring.epml.init(String("https://firefallmath.test.onfastspring.com/account/WYMz4fTsQJmmVzGTTpyjhw/TA4Y_9E6RKo"));
    subManagement();
  }, []);
  
  async function submit() {
    console.log(firstName, lastName, email, password, confirmPassword, school);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword || !school) {
      alert("Please fill out all fields!");
      return;
    }
    
    localStorage.setItem("email", email);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("school", school);
    localStorage.setItem("password", password);
    localStorage.setItem("confirmPassword", confirmPassword);
    localStorage.setItem("product", product);

      const securePayload = {
        "contact": {
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "country": "us"
        },
        "items": [
            {
              "product": product,
              "quantity": 1,
              "pricing": {
                "quantityBehavior": "hide",
              }
              // "pricing": {
              //   "price": {
              //   "USD": 19.00
              //   }
              // }
            }
        ]
      }
      setHasFirefallAccount(true);

      try {
        const account = await checkAccount(email);
        console.log("Account data:", account);
        if (account.accounts[0].subscriptions.length === 0) {
          fastspring.builder.secure(securePayload, "");
          fastspring.builder.checkout();
        }
        
      } catch (error) {
        console.error("Error during checkout:", error);
      }
  }

  function reset() {
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("school");
    localStorage.removeItem("password");
    localStorage.removeItem("confirmPassword");
    localStorage.removeItem("product");
  }

  async function openManagement() {

    try {
        const res = await fetch(`https://api.fastspring.com/accounts/${accountId}/authenticate`, {
          method: 'GET',
          headers: {
            "Authorization": `Basic ${encodedAuth}`,
            "Content-Type": "application/json"
          }
        })
        
        const data  = await res.json();
        console.log(data);
        window.location.href = data.accounts[0].url; // reloads page

      } catch (error) {
        console.error("Error fetching account:", error);
      }
  }

  async function checkAccount(email: string) {
    try {

      const res = await fetch(`https://api.fastspring.com/accounts?email=${email}`, {
        method: 'GET',
        headers: {
          "Authorization": `Basic ${encodedAuth}`,
          "Content-Type": "application/json"
        }
      })
      
      const data  = await res.json();
      console.log(data);
      setHasFastspringAccount(true);
      setAccountId(data.accounts[0].id);
      return data;
    } catch (error) {
      console.error("Error fetching account:", error);
      throw error;
    }
  }

  function subManagement() {
    fastspring.epml.paymentManagementComponent(String("EEsEAnsyTOCrEBlNMzX8jQ"), String("en"));
  }

  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, padding: '10px'}}>
        { hasFirefallAccount &&
          <span style={{ color: 'green'}}>Has Firefall Account</span>
        }
        <br></br>
        { hasFastspringAccount &&
          <span style={{ color: 'blue'}}>Has Fastspring Account - {accountId}</span>
        }
      </div>
      <div style={{position: 'absolute', top: 0, right: 0, padding: '10px', color: 'green'}}>
        <button onClick={reset}>Reset</button>
      </div>

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

        <label htmlFor="schoolSelect">School:</label>
        <select onChange={(e) => setProduct(e.target.value)} id="schoolSelect" name="schoolSelect" value={product}>
          <option value="">Select a product</option>
          <option value="firefall-math--monthly-teacher-tutor-subscription">Firefall Math (Monthly Teacher Subsciption)</option>
          <option value="firefall-math-yearly-parent-subscription">Firefall Math (Monthly Parent Subsciption)</option>
        </select>
      </form>

      <button onClick={submit}>Continue</button>
      <button onClick={openManagement}>Check Account</button>
    </>
  );
}

export default App;
