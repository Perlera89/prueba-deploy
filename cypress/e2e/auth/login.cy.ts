describe('mi primer test', () => {
    beforeEach('visita la pagina de login', () => {
        cy.visit('/auth/login')
    });

    it('identifica correctamente todos los elementos del formulario', () => {
        cy.get('input[type="text"]')
        cy.get('input[type="password"]')
        cy.contains('button', 'Iniciar sesión')
    });
})

describe('Formulario de inicio de sesión', () => {
    beforeEach(() => {
        cy.visit('/auth/login');
    });

    it('permite ingresar email y contraseña', () => {

        cy.get('input[type="text"]').type('usuario@ejemplo.com');
        cy.get('input[type="password"]').type('contraseña123.');


        cy.get('input[type="text"]').should('have.value', 'usuario@ejemplo.com');
        cy.get('input[type="password"]').should('have.value', 'contraseña123.');
    });
    it('muestra validación de credenciales', () => {
        cy.get('input[type="text"]').type('emailinvalido');
        cy.get('input[type="password"]').type('contraseña123.');

        cy.contains('button', 'Iniciar sesión').click();
        cy.url().should('include', '/auth/login');
        cy.contains('button', 'Iniciar sesión').should('be.visible');
    });

    it('requiere que ambos campos estén completos', () => {
        cy.contains('button', 'Iniciar sesión').click();

        cy.get('input:invalid').should('have.length.at.least', 1);
    });
});

describe('Fucion de inicio de sesión', () => {
    beforeEach(() => {
        cy.visit('/auth/login');
    })

    it('inicia sesión correctamente', () => {
        cy.intercept('POST', '/auth/sign-in').as('loginRequest');

        cy.get('input[type="text"]').type('te0001')
        cy.get('input[type="password"]').type('Test1234!');
        cy.contains('button', 'Iniciar sesión').click();
        cy.wait('@loginRequest').then((interception) => {

            console.log(interception.response?.body);
            expect(interception.response?.statusCode).to.equal(200);
            expect(interception.response?.body).to.have.property('tokens');
            expect(interception.response?.body.tokens).to.have.property('accessToken');
        });
    })
})