describe('Layout', () => {
  it('Assert page render data correctly', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Where in the world?');

    cy.get('[data-testid="country"]:nth-child(1)').within($country => {
      cy.get('img').should('have.attr', 'src', 'https://restcountries.eu/data/afg.svg')
      cy.get('[data-testid="name"]').should('contain', 'Afghanistan');
      cy.get('[data-testid="population"]').should('contain', '27657145');
      cy.get('[data-testid="region"]').should('contain', 'Asia');
      cy.get('[data-testid="capital"]').should('contain', 'Kabul');
    })
  })
})