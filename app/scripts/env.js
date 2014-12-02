var Env = {
  KIND_SLUG: '{{ENVIRONMENT_KIND_SLUG}}',
  TEAM_SLUG: '{{ENVIRONMENT_TEAM_SLUG}}',

  service: {
    NEWS: 'http://zh.clicrbs.com.br/pusher-data-service/api/news/list/gremio?size=20&hl=1'
  }
};

Env.isGremioTeam = Env.TEAM_SLUG == 'gremio';
Env.isInterTeam = Env.TEAM_SLUG == 'inter';

Env.isChromeKind = Env.KIND_SLUG == 'chrome';
Env.isFirefoxKind = Env.KIND_SLUG == 'firefox';
Env.isLinuxKind = Env.KIND_SLUG == 'linux';
Env.isOSXKind = Env.KIND_SLUG == 'os-x';
Env.isSandboxKind = Env.KIND_SLUG == 'sandbox';
Env.isWindowsKind = Env.KIND_SLUG == 'windows';

if (Env.isGremioTeam) {
  Env.TEAM_NAME = 'Grêmio';
  Env.TEAM_NICK = 'Gremista';
} else if (Env.isInterTeam) {
  Env.TEAM_NAME = 'Inter';
  Env.TEAM_NICK = 'Colorado';
}

module.exports = Env;
