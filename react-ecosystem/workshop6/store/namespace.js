const KNOWN_NAMESPACES = {};

export default proposedNamespace => {
  if (KNOWN_NAMESPACES[proposedNamespace]) {
    const collisionError = new Error(
      `The requested namespace '${proposedNamespace}' is already registered. See the originalRegistration property ` +
      'of this error for stack trace of the original registration',
    );
    collisionError.originalRegistration = KNOWN_NAMESPACES[proposedNamespace];
    throw collisionError;
  }

  // Store the stack trace of the original registration
  KNOWN_NAMESPACES[proposedNamespace] = new Error(`[The original registration of the ${proposedNamespace} namespace]`);

  return proposedNamespace;
};
