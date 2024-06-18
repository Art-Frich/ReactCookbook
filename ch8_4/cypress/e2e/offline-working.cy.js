describe('Offline working', () => {
  it(
    'should tell us when we are offline',
    // Тест должен сообщить нам, когда мы в офлайне
    { browser: '!firefox' },
    () => {
      // При условии, что приложение запущено
      cy.visit('http://localhost:3000');
      cy.contains(/you are currently offline/i).should('not.exist');
      // Когда приложение в офлайне
      cy.network({ offline: true });
      // Выводится соответствующее предупреждение
      cy.contains(/you are currently offline/i).should('be.visible');
      // Когда приложение возвращается в онлайн
      cy.network({ offline: false });
      // Предупреждение не выводится
      cy.contains(/you are currently offline/i).should('not.exist');
    }
  );
});
