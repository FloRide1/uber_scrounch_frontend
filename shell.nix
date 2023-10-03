with (import <nixpkgs> { });

mkShell { buildInputs = [ openssl ]; }
