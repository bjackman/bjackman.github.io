{
  description = "My blong";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-25.05";
    # Make ${./.} include submodule contents
    self.submodules = true;
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      formatter."${system}" = pkgs.nixfmt-tree;

      packages."${system}" = rec {
        site = pkgs.runCommand "site" {
          nativeBuildInputs = [ pkgs.hugo ];
        } ''
          # Can't get Hugo to not try to modify the source tree, so copy it
          # somewhere writable.
          writableSrc=$(mktemp -d)
          cp -R ${./.}/* "$writableSrc"

          hugo build \
            --cacheDir $(mktemp -d) \
            --destination $out \
            --source "$writableSrc"
        '';
        default = site;
      };

      devShells."${system}".default = pkgs.mkShell {
        packages = [ pkgs.hugo ];
      };
    };
}
