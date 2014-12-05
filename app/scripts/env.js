var Env = {
  KIND_SLUG: '{{ENVIRONMENT_KIND_SLUG}}',
  TEAM_SLUG: '{{ENVIRONMENT_TEAM_SLUG}}',

  service: {
    NEWS: 'http://zh.clicrbs.com.br/pusher-data-service/api/news/list/{{team}}?size=20'
  }
};

Env.TEAM_SLUG_CAPITALIZED = Env.TEAM_SLUG.charAt(0).toUpperCase() + Env.TEAM_SLUG.substring(1);

Env.isGremioTeam = Env.TEAM_SLUG == 'gremio';
Env.isInterTeam = Env.TEAM_SLUG == 'inter';

Env.isChromeKind = Env.KIND_SLUG == 'chrome';
Env.isFirefoxKind = Env.KIND_SLUG == 'firefox';
Env.isLinuxKind = Env.KIND_SLUG == 'linux';
Env.isOSXKind = Env.KIND_SLUG == 'os-x';
Env.isSandboxKind = Env.KIND_SLUG == 'sandbox';
Env.isWindowsKind = Env.KIND_SLUG == 'windows';

if (Env.isGremioTeam) {
  Env.TEAM_COLOR_ARRAY = [35, 145, 230, 255];
  Env.TEAM_COLOR_RGBA = 'rgba(35, 145, 230, 1)';
  Env.TEAM_NAME = 'Grêmio';
  Env.TEAM_NICK = 'Gremista';
  Env.TEAM_LINK = 'http://zh.clicrbs.com.br/rs/esportes/gremio';
} else if (Env.isInterTeam) {
  Env.TEAM_COLOR_ARRAY = [35, 145, 230, 255];
  Env.TEAM_COLOR_RGBA = 'rgba(35, 145, 230, 1)';
  Env.TEAM_NAME = 'Inter';
  Env.TEAM_NICK = 'Colorado';
  Env.TEAM_LINK = 'http://zh.clicrbs.com.br/rs/esportes/inter';
}

module.exports = Env;
