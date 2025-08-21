describe('Exclusao', () => {
  beforeEach(() => {
       //Arrange
        cy.visit('http://127.0.0.1:5502/index.html')
        cy.get('#email').type('teste@teste.com')
        cy.get('#password').type('123456')
        cy.get('.login-btn').click()
      })
    
  it('Excluir veiculo cadastrado', () => {
    
    //Act
     cy.get('#search-input').type('DEF9B12')
      cy.get('#search-btn').click()
      cy.get('.btn-delete').click()
      cy.get('#confirm-yes').click()

     

      cy.get('#toast')
     //Assert
     cy.get('.toast').should('have.text', 'Veículo DEF9B12 excluído com sucesso!')
  })
})

