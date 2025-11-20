import { useEffect } from "react";

export default function PaymentManager() {
  useEffect(() => {
    // Must be a primitive string
    // This simulates the authenticated account URL from FastSpring API
    const accountUrl = "https://firefallmath.test.onfastspring.com/account/7grjvDOMTF-tAgdEztztbg/JtqyopxVQ2s";

    // Safe: guarantees a primitive string
    fastspring.epml.init(String(accountUrl));
  }, []);

  function openSubscriptionManager() {
    // Primitive strings only
    const subscriptionId = "SUBSCRIPTION123";
    const language = "en";

    fastspring.epml.paymentManagementComponent(
      String(subscriptionId),
      String(language)
    );
  }

  return (
    <div>
      <button onClick={openSubscriptionManager}>
        Manage Subscription
      </button>
    </div>
  );
}
