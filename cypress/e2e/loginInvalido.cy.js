describe('Login', () => {
  it('Login inválido deve apresentar mensagem de erro', () => {
    
    //Arrange
    cy.visit('http://127.0.0.1:5502/index.html')
    
    //Act
     cy.get('#email').click().type('teste@teste.com')
     cy.get('#password').click().type('123457')
     cy.get('.login-btn').click()
     
     //Assert
    cy.get('.toast').should('be.visible')
  })
})