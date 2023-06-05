# 1 Project File Transfer

Anytime you are transferring copying/moving files there is a chance that files will be corrupted.  To ensure that the file integrity is maintained. It is imperative that you use a methods that ensure file integrity.

Instead of utilizing the OS copy function, whether in GUI or commandline, you should always rely on `rsync` to copy files.  While most OSs will not directly copy the data when moving files within a hardware partition filesystem, care must be taken because a folder often maps to a different bulk storage device, which will copy the data to the new partition using the OS default copy method.  Therefore, anytime you are moving data - **use rsync**.

## 1.1 Using Rsync

**Basic Usage:** `rsync <options> <Source> <Destination>`

### Common Options

| Option | Description |
| ------ | ----------- |
| -a     | Arcive Mode - recursively transfer files/folders; copies symlinks as symlinks; preserve permissions; preserve modification times; preserve ownder, preserve group | 
| -v     | Verbose Mode |
| -h     | Human readable output |
| --progress | Show transfer progress |

For additional options, please consult the manpages: `man rsync`

### Transferring Files to a new partition or folder
To transfer a file/folder to a local folder, `rsync` doesn't need to use SSH connection.

**Usage:** `rsync -avh --progress <File/Folder> <Local Folder>

### Transfers to Remote Server
To transfer a file `test.txt` to a remote server via SSH the `user` could provide their login name, server URL, and destination directory.

**Usage:** `rsync -avh --progress <file> <username>@<server URL>:<destination folder>`

**Example:** `rsync -avh --progress test.txt user@local.com:/home/user/.`

This will transfer the local file from your computer to the remote server in the `/home/user/` directory.

**Moving Multiple Files and Folders**
If you want to transfer a directory or multiple files you can provide the directory or wildcard `*`.

To move all the files and folders in your local HOME directory to the remote server.

**Example:** `rsync -avh --progress /home/user user@local.com:/home`


### Transferring Files from Remote Server to Local

Transfers the other direction is possible by merely ensuring that the `Source` is the remote server and the `Destination` is the local folder

**Usage:** `rsync -avh --progress <username>@<server URL>:<Source Directory/File> <Local Folder>`




