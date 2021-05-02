import * as preact from "https://unpkg.com/preact@latest?module";
import * as hooks from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
window.preact = preact;
window.hooks = hooks;
const { h, render } = preact;
const html = htm.bind(h);
window.html = html;
import App from "./App.js";
const hasTicketInSearch = Boolean(
  new URLSearchParams(window.location.search).get("ticket")
);
const hasTicket = !!localStorage.getItem("hasTicket") || hasTicketInSearch;
if (hasTicketInSearch) {
  localStorage.setItem("hasTicket", "true");
  window.location.search = "";
} else {
  if (hasTicket) {
    render(
      html`<${App(preact, hooks)} />`,
      document.getElementById("container")
    );
  } else {
    render(
      html`<div style=${{ textAlign: "center" }}>
        You need to purchase a ticket to watch the concert. You can get
        yours${" "}
        <a
          href="https://thereignofkindo.com/liveconcert"
          style=${{ color: "lightblue", textDecoration: "underline" }}
          >here</a
        >
      </div>`,
      document.getElementById("container")
    );
  }
}
