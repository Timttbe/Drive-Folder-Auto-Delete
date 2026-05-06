function apagarArquivosSeteDias() {
  Logger.log("Script iniciado em: " + new Date());

  var pastaId = "1DTWle5x4GYzkqCe1eMzHvxW04G2QgNme";
  var diasParaManter = 7;

  var pasta = DriveApp.getFolderById(pastaId);
  var arquivos = pasta.getFiles();

  var dataLimite = new Date();
  dataLimite.setHours(0,0,0,0);
  dataLimite.setDate(dataLimite.getDate() - diasParaManter);

  var totalDeletados = 0;

  while (arquivos.hasNext()) {
    var arquivo = arquivos.next();

    var dataCriacao = arquivo.getDateCreated();
    dataCriacao.setHours(0,0,0,0);

    if (dataCriacao <= dataLimite) {
      Logger.log("Deletando permanentemente: " + arquivo.getName());

      try {
        Drive.Files.remove(arquivo.getId());
        totalDeletados++;
      } catch (e) {
        Logger.log("Erro ao deletar: " + arquivo.getName() + " | " + e.message);
      }
    }
  }

  Logger.log("Total de arquivos deletados: " + totalDeletados);
  Logger.log("Script finalizado em: " + new Date());
}