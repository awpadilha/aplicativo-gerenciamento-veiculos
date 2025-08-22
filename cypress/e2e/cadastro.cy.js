describe('Cadastro', () => {
    beforeEach(() => {
      //Arrange
        cy.visit('http://127.0.0.1:5502/index.html')
        cy.get('#email').type('teste@teste.com')
        cy.get('#password').type('123456')
        cy.get('.login-btn').click()
      
      })

    it('Cadastrar veiculos no sistema', () => {

      //Act
      cy.get('#placa').click().type('BKP3J27')
      cy.get('#modelo').click().type('Onix')
      cy.get('#marca').click().type('Chevrolet ')
      cy.get('#ano').click().type('2020')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('MTR5L92')
      cy.get('#modelo').click().type('Gol')
      cy.get('#marca').click().type('Volkswagen')
      cy.get('#ano').click().type('2021')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('QSN8D64')
      cy.get('#modelo').click().type('Argo')
      cy.get('#marca').click().type('Fiat')
      cy.get('#ano').click().type('2023')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('ZHC2A59')
      cy.get('#modelo').click().type('HB20')
      cy.get('#marca').click().type('Hyundai')
      cy.get('#ano').click().type('2015')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('LVA9T31')
      cy.get('#modelo').click().type('Corolla')
      cy.get('#marca').click().type('Toyota')
      cy.get('#ano').click().type('2022')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('DRQ4M87')
      cy.get('#modelo').click().type('Civic')
      cy.get('#marca').click().type('Honda')
      cy.get('#ano').click().type('2021')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('XJG6C20')
      cy.get('#modelo').click().type('Ranger')
      cy.get('#marca').click().type('Ford')
      cy.get('#ano').click().type('2019')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('PTB1F73')
      cy.get('#modelo').click().type('Compass')
      cy.get('#marca').click().type('Jeep')
      cy.get('#ano').click().type('2002')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('HYN7R06')
      cy.get('#modelo').click().type('X1')
      cy.get('#marca').click().type('BMW')
      cy.get('#ano').click().type('2020')
      cy.get('#submit-btn').click()  

      cy.get('#placa').click().type('CQL5K88')
      cy.get('#modelo').click().type('C180')
      cy.get('#marca').click().type('Mercedes-Benz')
      cy.get('#ano').click().type('2017')
      cy.get('#submit-btn').click()  

      //Assert
      cy.contains(':nth-child(4) > :nth-child(1) > strong', 'BKP-3J27').should('be.visible')
      cy.contains(':nth-child(5) > :nth-child(1) > strong', 'MTR-5L92').should('be.visible')
      cy.contains(':nth-child(6) > :nth-child(1) > strong', 'QSN-8D64').should('be.visible')
      cy.contains(':nth-child(7) > :nth-child(1) > strong', 'ZHC-2A59').should('be.visible')
      cy.contains(':nth-child(8) > :nth-child(1) > strong', 'LVA-9T31').should('be.visible')
      cy.contains(':nth-child(9) > :nth-child(1) > strong', 'DRQ-4M87').should('be.visible')
      cy.contains(':nth-child(10) > :nth-child(1) > strong', 'XJG-6C20').should('be.visible')
      cy.contains(':nth-child(11) > :nth-child(1) > strong', 'PTB-1F73').should('be.visible')
      cy.contains(':nth-child(12) > :nth-child(1) > strong', 'HYN-7R06').should('be.visible')
      cy.contains(':nth-child(13) > :nth-child(1) > strong', 'CQL-5K88').should('be.visible')


    })

   

   
  
})