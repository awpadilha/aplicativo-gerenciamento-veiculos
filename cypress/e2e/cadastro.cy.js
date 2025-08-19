describe('Login', () => {
  it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://127.0.0.1:5502/index.html')
    
    //Act
     cy.get('#email').click().type('teste@teste.com')
     cy.get('#password').click().type('123456')
     cy.get('.login-btn').click()
     cy.get('#placa').click().type('BKP3J27')
     cy.get('#modelo').click().type('Onix')
     cy.get('#marca').click().type('Chevrolet ')
     cy.get('#ano').click().type('2020')
     cy.get('#submit-btn').click()  

     
     //Assert
     cy.contains(':nth-child(4) > :nth-child(1) > strong', 'BKP-3J27').should('be.visible')
  })
})