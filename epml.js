(window.fastspring = window.fastspring || {}),
  (fastspring.epml = new (function () {
    localStorage.setItem(
      "fastspring_pml_initalization_time",
      new Date().getTime()
    );
    var t = "",
      e = "";
    (this.init = function (n) {
      const a = document.querySelector("script#fsc-epml");
      (t = n),
        a &&
          a.getAttribute("data-payment-component-id") &&
          (e = a.getAttribute("data-payment-component-id")),
        location.href.indexOf(
          "fastspring.github.io/playground/embedded-payment/index.html"
        ) > -1 &&
          document.querySelector("#componentId") &&
          (e = document.querySelector("#componentId").value);
    }),
      (this.paymentManagementComponent = function (a, o) {
        let i = "";
        console.log(t);
        if (
          ((a && 0 !== a.trim().length) ||
            (i += "Subscription ID is invalid. "),
          // (t && 0 !== t.trim().length) ||
          //   (i += "Authenticated AM portal link is invalid. "),
          (e && 0 !== e.trim().length) ||
            (i += "Payment Component ID is invalid. "),
          i.length > 0)
        )
          throw new Error(i);
        {
          localStorage.setItem("fastspring_pml_subid", a),
            localStorage.setItem("fastspring_pml_am_portal_link", t),
            localStorage.setItem("fastspring_pml_payment_component_id", e);
          let i = `${t}/payment-component?componentId=${e}&subscriptionId=${a}&overrideOrigin=${location.href}`;
          o &&
            2 === o.trim().length &&
            (localStorage.setItem("fastspring_pml_lang", o),
            (i += `&lang=${o}`)),
            n(i);
        }
      }),
      (this.redirectCallPaymentMethod = function (t) {
        const e = localStorage.getItem("fastspring_pml_subid"),
          a = localStorage.getItem("fastspring_pml_am_portal_link"),
          o = localStorage.getItem("fastspring_pml_payment_component_id");
        if (null != e && null != a && null != o) {
          const i = `${a}/payment-component?componentId=${o}&subscriptionId=${e}&fscMessage=${t}&overrideOrigin=${location.href}`;
          n(i);
        }
      });
    var n = function (t) {
      if (t.length > 0) {
        const e = localStorage.getItem("fastspring_pml_initalization_time"),
          n = new Date().getTime();
        if (e && n - e > 86e6) {
          let e = localStorage.getItem("fastspring_pml_lang");
          (t =
            "https://d1f8f9xcsvx3ha.cloudfront.net/epml/latest-qa/index.html"),
            e && (t += `?lang=${e}`);
        }
        if (!document.getElementById("fscPayMangementCanvas")) {
          const e = document.createElement("div");
          (e.id = "fscPayMangementCanvas"),
            (e.style.cssText =
              "width: 100% !important; height: 100% !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 100000000 !important; overflow-y: scroll !important"),
            document.body.appendChild(e);
          const n = document.createElement("iframe");
          (n.id = "fsc-payment-component-frame"),
            (n.name = "Payment Update"),
            (n.allow = "payment"),
            n.setAttribute("src", t),
            (n.style.cssText =
              "position: absolute; z-index: 1000000; display: block; width: 100% !important; height: 100vh !important; border: 0 !important"),
            document.getElementById("fscPayMangementCanvas").appendChild(n);
        }
      }
    };
  })()),
  window.addEventListener("message", (t) => {
    if (t && t.data) {
      const e = t.data.fscPaymentComponentMessage;
      if (e && "close" === e.type) {
        const t = document.getElementById("fscPayMangementCanvas");
        t && document.body.removeChild(t);
      }
    }
  }),
  window.addEventListener("load", (t) => {
    -1 !== location.href.indexOf("fscNext=fsc%3Ainvoke%3Acomplete") &&
      fastspring.epml.redirectCallPaymentMethod("success");
  });
