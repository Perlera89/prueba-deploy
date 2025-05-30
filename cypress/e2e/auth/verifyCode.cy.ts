
describe('Formulario de verificacionOtp', () => {
    beforeEach('carga de la pagina', () => {
        cy.visit('/auth/verify-email');
    })

    it('identifica correctamente todos los elementos del formulario', () => {
        cy.get('input[name="verificationCode"]')
        cy.get('button[type="submit"]')

        cy.contains('button', 'Verificar')
    });

    it('verificar otp invalido', () => {


        cy.get('input[name="verificationCode"]').type('123456')
        cy.contains('button[type="submit"]', 'Verificar').click()
        cy.intercept('POST', '**/user/verify-email*', {
            statusCode: 400,
            body: {
                message: 'El código de verificación es inválido'
            }
        }).as('verifyEmail')
        cy.wait('@verifyEmail').then((interception) => {
            expect(interception.response?.statusCode).to.equal(400)
            expect(interception.response?.body.message).to.equal('El código de verificación es inválido')
        })
    })
})