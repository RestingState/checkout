import { useEffect } from "react";
import "./App.css";
import { loadCheckoutWebComponents } from "@checkout.com/checkout-web-components";

function App() {
  useEffect(() => {
    (async () => {
      const PUBLIC_KEY = "pk_sbox_4hf5oe5cwhvzgq2axtn2wcb2taw";

      const response = await fetch(
        "http://127.0.0.1:5000/create-payment-sessions",
        {
          method: "POST",
        }
      ); // Order
      const paymentSession = await response.json();

      if (!response.ok) {
        console.error("Error creating payment session", paymentSession);
        return;
      }

      const checkout = await loadCheckoutWebComponents({
        publicKey: PUBLIC_KEY,
        environment: "sandbox",
        locale: "en-GB",
        paymentSession,
        // onReady: () => {
        //   console.log("onReady");
        // },
        // onPaymentCompleted: (_component, paymentResponse) => {
        //   console.log("Create Payment with PaymentId: ", paymentResponse.id);
        // },
        // onChange: (component) => {
        //   console.log(
        //     `onChange() -> isValid: "${component.isValid()}" for "${
        //       component.type
        //     }"`
        //   );
        // },
        // onError: (component, error) => {
        //   console.log("onError", error, "Component", component.type);
        // },
      });

      const flowComponent = checkout.create("flow");

      flowComponent.mount(document.getElementById("flow-container"));

      function triggerToast(id) {
        var element = document.getElementById(id);
        element.classList.add("show");

        setTimeout(function () {
          element.classList.remove("show");
        }, 5000);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("status");
      const paymentId = urlParams.get("cko-payment-id");

      if (paymentStatus === "succeeded") {
        triggerToast("successToast");
      }

      if (paymentStatus === "failed") {
        triggerToast("failedToast");
      }

      if (paymentId) {
        console.log("Create Payment with PaymentId: ", paymentId);
      }
    })();
  }, []);

  return (
    <>
      <div id="successToast" className="toast success">
        <span>The payment was successful</span>
      </div>

      <div id="failedToast" className="toast failed">
        <span>The payment failed, try again</span>
      </div>

      <form>
        <div className="container">
          <div id="flow-container"></div>
        </div>
        <span id="error-message"></span>
        <span id="successful-payment-message"></span>
      </form>
    </>
  );
}

export default App;
