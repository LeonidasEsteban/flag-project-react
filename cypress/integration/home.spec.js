import { firstCountry } from './utils';

describe('Layout', () => {
  it('Assert page render data correctly', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Where in the world?');

    cy.get(firstCountry).within($country => {
      cy.get('img').should('have.attr', 'src', 'https://restcountries.eu/data/afg.svg')
      cy.get('[data-testid="name"]').should('contain', 'Afghanistan');
      cy.get('[data-testid="population"]').should('contain', '27657145');
      cy.get('[data-testid="region"]').should('contain', 'Asia');
      cy.get('[data-testid="capital"]').should('contain', 'Kabul');
    })
  })
})

describe('filters', function () {
  it('should filter by region', function () {
    cy.visit('/');
    // having Afghanistan at first position
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Afghanistan');

    // When user select Americas region
    cy.get('#filter').click();
    cy.get('ul > :nth-child(2)').click();

    // Assert Anguilla is at first position now
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Anguilla');
  });
  it('should filter by text', function () {
    cy.visit('/');
    // having Afghanistan at first position
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Afghanistan');

    // When user type Mex
    cy.get('input').type('Mex');

    // Assert Mexico is at first position now
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Mexico');
  });
  it('should show all countries without filter when user clicks on remove input icon', function () {
    cy.visit('/');
    // having Afghanistan at first position
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Afghanistan');
    // and filtering by text
    cy.get('input').type('Mex');

    // When user clicks on remove icon
    cy.get('.fa-times').click();

    // Assert Anguilla is at first position now
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Afghanistan');
  });
  it('should filter by text and later by region', function () {
    cy.visit('/');
    // having Afghanistan at first position
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Afghanistan');

    // When:
    // - user type
    cy.get('input').type('Do');
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Andorra');

    // - user select Americas region
    cy.get('#filter').click();
    cy.get('ul > :nth-child(2)').click();

    // Assert Mexico is at first position now
    cy.get(`${firstCountry} [data-testid="name"]`).should('contain', 'Barbados');
  });
});