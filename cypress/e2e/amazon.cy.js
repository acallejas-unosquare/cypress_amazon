describe('Validate Amazon Search Feature', () => {
  it('Course amazon script', ()=> {
      // Go to www.amazon.com
      cy.visit('https://www.amazon.com');
      // Validate that the URL contains "Amazon"
      cy.url().should('include', 'amazon');
      
      //Validate the menu contains at least 5 items - today's deals, Customer service, Registry, Gift Cards and Sell
      cy.get('[data-action-type="DISMISS"]').click();
      cy.contains('deals').scrollIntoView()
      cy.contains('deals').should('be.visible');
      cy.contains('Customer Service').should('be.visible');
      cy.contains('Gift Cards').should('be.visible');
      cy.contains('Sell').should('be.visible');
      cy.get('[data-csa-c-type="link"]').contains('Registry').should('be.visible');

      // Validate that the Search icon and Bar are present
      cy.get("#twotabsearchtextbox").as('searchBox');
      cy.get("#nav-search-submit-button").as('searchBtn');
      cy.get("#twotabsearchtextbox").should('be.visible');
      cy.get("#nav-search-submit-button").should('be.visible');
      
      // Search for Apple Watch
      cy.get('@searchBox').type('Apple Watch');
      cy.get('@searchBtn').click();

      // Validate that the result list has at least 2 items
      cy.get('[data-cy="title-recipe"]').should('have.length.greaterThan', 2);

      // Click on the item to see the "Details" page
      cy.get('[data-cy="title-recipe"]').eq(1).scrollIntoView();
      cy.get('[data-cy="title-recipe"]').eq(1).find('.a-link-normal').click();

      // Store the price in a variable
      cy.get('span.a-text-price').eq(0).as('price')

      // Verify the price is not null
      cy.get('@price').should('not.null')

      // Add to cart
      cy.get('#add-to-cart-button').click();

      // Go to cart details, verify the item is there
      cy.get('#nav-cart-count').click();
      cy.get('.a-text-normal').contains('Apple Watch');
  });
});
