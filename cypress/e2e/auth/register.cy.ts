
const credentials = {
    email: 'lo0706032020@unab.edu.sv',
    names: 'denis',
    surnames: 'lopez',
    password: 'Test123!',
    confirmPassword: 'Test123!'

}


describe('Formulario de registro', () => {
    beforeEach('carga de la pagina', () => {
        cy.visit('/auth/register');
    })

    it('identifica correctamente todos los elementos del formulario', () => {
        cy.get('input[name="email"]')
        cy.get('input[name="names"]')
        cy.get('input[name="surnames"]')
        cy.get('input[name="password"]')
        cy.get('input[name="confirmPassword"]')
        cy.get('button[role="checkbox"]')

        cy.contains('button', 'Registrarse')
    });

    it('Detecta que no se aceptan terminos y condiciones', () => {
        cy.get('input[name="email"]').type(credentials.email);
        cy.get('input[name="names"]').type(credentials.names);
        cy.get('input[name="surnames"]').type(credentials.surnames);
        cy.get('input[name="password"]').type(credentials.password);
        cy.get('input[name="confirmPassword"]').type(credentials.confirmPassword);

        cy.get('input[name="email"]').should('have.value', credentials.email)
        cy.get('input[name="names"]').should('have.value', credentials.names)
        cy.get('input[name="surnames"]').should('have.value', credentials.surnames)
        cy.get('input[name="password"]').should('have.value', credentials.password)
        cy.get('input[name="confirmPassword"]').should('have.value', credentials.confirmPassword)
        cy.get('button#visible-section[role="checkbox"]').should('have.attr', 'aria-checked', 'false')

    })

    it('Envia codigo de confirmacion de correo', () => {


        cy.get('input[name="email"]').type(credentials.email);
        cy.get('input[name="names"]').type(credentials.names);
        cy.get('input[name="surnames"]').type(credentials.surnames);
        cy.get('input[name="password"]').type(credentials.password);
        cy.get('input[name="confirmPassword"]').type(credentials.confirmPassword);

        cy.get('button[role="checkbox"]').click();

        cy.get('button[role="checkbox"]').should('have.attr', 'aria-checked', 'true');

        cy.contains('button[type="submit"]', 'Registrarse').click();

        cy.intercept('POST', '**/user/register*', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Código de verificación enviado',
                userId: String
            }
        }).as('registerRequest');

        cy.wait('@registerRequest').then((interception) => {
            expect(interception.request.body).to.have.property('email', credentials.email);
            cy.url().should('include', '/auth/verify-email');
        });

        cy.intercept('GET', '**/auth/verify-email*').as('verifyEmailRequest');

        cy.wait('@verifyEmailRequest').then((interception) => {
            console.log('veryfy', interception.response);
        })


    })
})