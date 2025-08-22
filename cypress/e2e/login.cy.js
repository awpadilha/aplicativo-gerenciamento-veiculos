describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://127.0.0.1:5502/index.html')
    })
  it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Act
     cy.get('#email').click().type('teste@teste.com')
     cy.get('#password').click().type('123456')
     cy.contains('button', 'Entrar').click()
     
     //Assert
     cy.contains('h1', '🚗 Sistema de Cadastro de Veículos').should('be.visible')
  })

  it('Login inválido deve apresentar mensagem de erro', () => {
    
    //Act
     cy.get('#email').click().type('teste@teste.com')
     cy.get('#password').click().type('123457')
     cy.contains('button', 'Entrar').click()
     //Assert
    cy.get('.toast').should('be.visible')
  })
})