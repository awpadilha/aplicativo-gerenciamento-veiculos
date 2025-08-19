describe('Login', () => {
  beforeEach(() => {
    cy.session('usuario-logado', () => {
      cy.visit('http://127.0.0.1:5502/index.html')
      cy.get('#email').type('teste@teste.com')
      cy.get('#password').type('123456')
      cy.get('.login-btn').click()
    })
  })

  it('Deve cadastrar veículo', () => {
    cy.visit('http://127.0.0.1:5502/index.html')

    cy.get('#placa').type('BKP3J27')
    cy.get('#modelo').type('Onix')
    cy.get('#marca').type('Chevrolet')
    cy.get('#ano').type('2020')
    cy.get('#submit-btn').click()

    cy.contains(':nth-child(4) > :nth-child(1) > strong', 'BKP-3J27')
      .should('be.visible')
  })
})
