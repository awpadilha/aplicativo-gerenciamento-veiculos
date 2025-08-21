describe('Cadastro', () => {
    beforeEach(() => {
      //Arrange
        cy.visit('http://127.0.0.1:5502/index.html')
        cy.get('#email').type('teste@teste.com')
        cy.get('#password').type('123456')
        cy.get('.login-btn').click()
      
      })

    it('Cadastrar veiculo no sistema', () => {

      //Act
      cy.get('#placa').click().type('BKP3J27')
      cy.get('#modelo').click().type('Onix')
      cy.get('#marca').click().type('Chevrolet ')
      cy.get('#ano').click().type('2020')
      cy.get('#submit-btn').click()  

      //Assert
      cy.contains(':nth-child(4) > :nth-child(1) > strong', 'BKP-3J27').should('be.visible')
    })

    it('Deve cadastrar veículo duplicado', () => {
      
      cy.get('#placa').type('BKP3J27')
      cy.get('#modelo').type('Onix')
      cy.get('#marca').type('Chevrolet')
      cy.get('#ano').type('2020')
      cy.get('#submit-btn').click()

      //Assert
      cy.contains(':nth-child(4) > :nth-child(1) > strong', 'BKP-3J27').should('be.visible')
    })

     it('Deve editar veículo cadastrado', () => {
      
      cy.get('#search-input').type('BKP3J27')
      cy.get('#search-btn').click()
      cy.get('.btn-edit').click()
      cy.get('#modelo').type('Camaro')
      cy.get('#submit-btn').click()

      //Assert
      cy.contains('#vehicles-tbody > :nth-child(4) > :nth-child(2)', 'Camaro').should('be.visible')
    })

   
  
})