describe("ChatRoom E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/channel/ROOM123");
    cy.window().then((win) => {
      win.socket = {
        id: "socket123",
        emit: cy.stub().callsFake((event, data, cb) => {
          if(event === "getRoomInfo"){
            cb({ success: true, isOwner: true, users: [], passwordProtected: false });
          }
          if(event === "joinRoom"){
            cb({ success: true });
          }
          if(event === "sendMessage"){
            cb({ success: true });
          }
        }),
        on: cy.stub(),
        off: cy.stub()
      };
    });
  });

  it("Mesaj gönderip input temizleniyor", () => {
    const message = "Merhaba test mesajı";

    cy.get('input[placeholder="Mesaj gönder"]')
      .type(message)
      .should("have.value", message);

    cy.get('svg[aria-label="Mesaj Gönder"]').click();

    cy.get('input[placeholder="Mesaj gönder"]').should("have.value", "");
  });

  it("Odadan çıkış yapınca anasayfaya yönlenir", () => {
    cy.get('svg[aria-label="Odadan Çık"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
