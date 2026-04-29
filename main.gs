function deleteFilesOlderThanSevenDays() {
  Logger.log("Script started at: " + new Date());
  
  var folderId = "PASTE_YOUR_FOLDER_ID_HERE";
  var daysToKeep = 7; //Define how many days until deletion 
  
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  while (files.hasNext()) {
    var file = files.next();
    
    if (file.getDateCreated() < cutoffDate) {
      Logger.log("Permanently deleting: " + file.getName());
      
      Drive.Files.remove(file.getId()); // Permanent deletion
      // file.setTrashed(true);         // Alternative: move to trash
    }
  }
}