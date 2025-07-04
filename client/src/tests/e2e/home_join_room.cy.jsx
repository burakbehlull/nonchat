describe("HomeContent E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Davet kodu boşken katılmaya çalışınca toast error gösterir", () => {
    cy.get('button').contains("Katıl").click();

    cy.contains("Lütfen davet kodunu giriniz.").should("be.visible");
  });

  it("Geçerli davet kodu girince socket emit ve navigasyon", () => {
    cy.window().then((win) => {
      const emitStub = cy.stub().callsFake((event, data, cb) => {
        if(event === "getRoomInfo"){
          cb({ success: true, isOwner: true, passwordProtected: false });
        }
        if(event === "joinRoom"){
          cb({ success: true, message: "" });
        }
      });
      win.socket = { emit: emitStub };
    });

    cy.get('input[aria-label="Kod giriniz"]').type("ABCD1234");

    cy.get('button').contains("Katıl").click();

    cy.contains("Giriş başarılı").should("be.visible");

    cy.url().should("include", "/channel/ABCD1234");
  });

  it("Şifre korumalı oda için modal açılır", () => {
    cy.window().then((win) => {
      const emitStub = cy.stub().callsFake((event, data, cb) => {
        if(event === "getRoomInfo"){
          cb({ success: true, isOwner: false, passwordProtected: true });
        }
      });
      win.socket = { emit: emitStub };
    });

    cy.get('input[aria-label="Kod giriniz"]').type("PASSROOM");
    cy.get('button').contains("Katıl").click();

    cy.get('div[role="dialog"]').should("be.visible");
  });

  it("Yeni Oda oluşturma butonu görünür ve tıklanabilir", () => {
    cy.get('button').contains("Yeni Oda").should("be.visible").click();

    cy.get('div[role="dialog"]').should("contain.text", "Oda Oluştur");
  });
});
