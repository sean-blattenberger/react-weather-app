describe("Tetsing weather app", () => {
  it("", () => {
    cy.visit("/");
    cy.get("#logo-container").should("have.text", "WeatherApp");
    cy.get("#card-header").should("have.text", "YOUR CURRENT LOCAL WEATHER IN");
  });
});
