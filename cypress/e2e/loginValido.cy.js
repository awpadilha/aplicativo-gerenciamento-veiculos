describe('Login', () => {
  it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://127.0.0.1:5502/index.html')
    
    //Act
     cy.get('#email').click().type('teste@teste.com')
     cy.get('#password').click().type('123456')
     cy.get('.login-btn').click()
     
     //Assert
     cy.contains('h1', '🚗 Sistema de Cadastro de Veículos').should('be.visible')
  })
})