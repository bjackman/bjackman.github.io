{
  description = "My blong";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-25.05";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      formatter."${system}" = pkgs.nixfmt-tree;

      devShells."${system}".default = pkgs.mkShell {
        packages = [ pkgs.hugo ];
      };
    };
}
