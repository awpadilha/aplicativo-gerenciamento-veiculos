describe('Login', () => {
    it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://127.0.0.1:5502/index.html')
    
    //Act
     cy.get('#email').click().type('')
     cy.get('#password').click().type('')
     cy.get('.login-btn').click()

     cy.wait(2000)
     
     //Assert
    cy.get('.toast').should('be.visible')
  })
})