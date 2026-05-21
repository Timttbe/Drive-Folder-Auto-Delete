function apagarArquivosSeteDias() {
  Logger.log("Script iniciado em: " + new Date());

  var pastasIds = [
    "1DTWle5x4GYzkqCe1eMzHvxW04G2QgNme",
    "1-pB4c_28SaT1MBtnHcoH-MBQyIoyB0uA"
  ];

  var diasParaManter = 7;
  var dataLimite = new Date();
  dataLimite.setHours(0, 0, 0, 0);
  dataLimite.setDate(dataLimite.getDate() - diasParaManter);
  var totalGeralDeletados = 0;

  pastasIds.forEach(function(pastaId) {
    try {
      var pasta = DriveApp.getFolderById(pastaId);
      var arquivos = pasta.getFiles();
      Logger.log("Verificando pasta: " + pasta.getName());
      var totalDeletadosNaPasta = 0;

      while (arquivos.hasNext()) {
        var arquivo = arquivos.next();
        var dataCriacao = new Date(arquivo.getDateCreated());
        dataCriacao.setHours(0, 0, 0, 0);

        if (dataCriacao <= dataLimite) {
          Logger.log("Deletando permanentemente: " + arquivo.getName());
          try {
            Drive.Files.remove(arquivo.getId());
            totalDeletadosNaPasta++;
            totalGeralDeletados++;
          } catch (e) {
            Logger.log("Erro ao deletar: " + arquivo.getName() + " | " + e.message);
          }
        }
      }
      Logger.log("Total deletados na pasta " + pasta.getName() + ": " + totalDeletadosNaPasta);

    } catch (e) {
      Logger.log("Erro ao acessar pasta ID " + pastaId + " | " + e.message);
    }
  });
  Logger.log("Total geral de arquivos deletados: " + totalGeralDeletados);
  Logger.log("Script finalizado em: " + new Date());
}
