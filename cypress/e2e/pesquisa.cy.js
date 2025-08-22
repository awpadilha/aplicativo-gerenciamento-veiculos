describe('Cadastro', () => {
    beforeEach(() => {
      //Arrange
        cy.visit('http://127.0.0.1:5502/index.html')
        cy.get('#email').type('teste@teste.com')
        cy.get('#password').type('123456')
        cy.get('.login-btn').click()
      
      })

    it('Pesquisa por placa', () => {

      //Act
      cy.get('#search-input').type('ABC1234')
      cy.get('#search-btn').click()

      //Assert
      cy.contains('#vehicles-tbody > tr > :nth-child(1)', 'ABC-1234').should('be.visible')
    })

     it('Pesquisa por modelo', () => {

      //Act
      cy.get('#search-input').type('Corolla')
      cy.get('#search-btn').click()

      //Assert
      cy.contains('#vehicles-tbody > tr > :nth-child(2)', 'Corolla').should('be.visible')
    })

     it('Pesquisa por marca', () => {

      //Act
      cy.get('#search-input').type('Honda')
      cy.get('#search-btn').click()

      //Assert
      cy.contains('#vehicles-tbody > tr > :nth-child(3)', 'Honda').should('be.visible')
    })

  

   
  
})