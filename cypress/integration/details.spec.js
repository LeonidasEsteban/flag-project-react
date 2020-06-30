import { firstCountry } from './utils';

describe('Navigation', function () {
  it('should redirect to country details when user clicks a country items', function () {
    // having
    cy.visit('/');

    // When user select first country
    cy.get(`${firstCountry}`).click();

    // Then redirect to details page
    cy.url().should('include', '/country/AF');
  });

  // Back
  it('should redirect back when user click on back button', function () {
    // having first country details
    cy.visit('/');
    cy.get(`${firstCountry}`).click();

    // When user clicks back
    cy.get('.back').click();

    // Then redirect to home page
    cy.url().should('not.include', '/country/AF');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it.only('should redirect back when user enter espeicif url path', function () {
    // having first country details
    cy.visit('/country/AF');

    // When user clicks back
    cy.get('.back').click();

    // Then redirect to home page
    cy.url().should('not.include', '/country/AF');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

describe('Content', function () {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`${firstCountry}`).click();
  });

  it('should show data correctly', function () {
    cy.get('img').should('have.attr', 'src', 'https://restcountries.eu/data/afg.svg');
    cy.get('[data-testid="name"]').should('contain', 'Afghanistan');
    cy.get('[data-testid="population"]').should('contain', '27657145');
    cy.get('[data-testid="region"]').should('contain', 'Asia');
    cy.get('[data-testid="sub-region"]').should('contain', 'Southern Asia');
    cy.get('[data-testid="capital"]').should('contain', 'Kabul');
    cy.get('[data-testid="top-level-domain"]').should('contain', '.af');
    cy.get('[data-testid="currencies"]').should('contain', 'Afghan afghani');
    cy.get('[data-testid="languages"]').within($languages => {
      cy.get($languages).should('contain', 'Pashto');
      cy.get($languages).should('contain', 'Uzbek');
      cy.get($languages).should('contain', 'Turkmen');
    });

    // border countries
    cy.get('.border-item').should('have.length', 6);
  });

  // Go to details from url
  it('should show data when user enter exact url path', function () {
    // having
    cy.visit('/country/AF');

    // Get and show data
    cy.get('[data-testid="name"]').should('contain', 'Afghanistan');
  });

});