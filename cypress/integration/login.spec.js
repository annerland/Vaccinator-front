/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const BASE_URL = 'localhost:3001'

describe('Primeira visita', () => {
  it('Entrando na página inicial', () => {
    cy.visit(`${BASE_URL}`)
  })

  describe('Trocando idioma', () => {
    it('Português'), () => {
      cy.get('[alt="br-flag"]').click({ force: true })
    }
    it('Inglês'), () => {
      cy.get('[alt="us-flag"]').click({ force: true })
    }
  })

  describe('Entrando na plataforma', () => {
    it('Clicando no botão', () => {
      cy.get('.home-navbar > .button').click()
    })

    it('Digitando E-mail', () => {
      cy.get(':nth-child(2) > input').type('josecampillo228@gmail.com')
    })

    it('Digitando senha', () => {
      cy.get(':nth-child(3) > input').type('123')
    })

    it('Logando na plataforma', () => {
      cy.get('.button').click()
    })

    it('Acessando vacinas', () => {
      cy.get('ul > :nth-child(2)').click()
    })

    it('Apertando botão para abrir o modal da vacina e criar uma vacina', () => {
      cy.get('.button').click()
    })

    it('Digitando nome da vacina', () => {
      cy.get(':nth-child(2) > input').type('Malária')
    })

    it('Digitando descrição da vacina', () => {
      cy.get(':nth-child(3) > input').type('Vacina da Malária')
    })

    it('Digitando restrição da vacina', () => {
      cy.get(':nth-child(4) > input').type('Crianças de 8 anos para baixo')
    })

    it('Inserindo quantidade de doses', () => {
      cy.get(':nth-child(5) > input').type('1')
    })

    it('Inserindo intervalo de doses', () => {
      cy.get(':nth-child(6) > input').type('2')
    })

    it('Digitando indicações da vacina', () => {
      cy.get(':nth-child(7) > input').type('Adultos de 20 á 35 anos')
    })

    it('Digitando efeitos da vacina', () => {
      cy.get(':nth-child(8) > input').type('Dor no pé')
    })

    it('Digitando cuidados da vacina', () => {
      cy.get(':nth-child(9) > input').type('Fazer carinho no pé')
    })

    it('Digitando via de aplicação da vacina', () => {
      cy.get(':nth-child(10) > input').type('Braço')
    })

    it('Enviando dados', () => {
      cy.get('.modal-container > .button').click()
    })

    it('OK', () => {
      cy.get('.user-routes > .generic-modal > .generic-body > .modal-actions > .button').click()
    })
  })
})
