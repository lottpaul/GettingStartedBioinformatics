# Appendix L.3 Project Archiving & Backup

Once you've transferred the files and verified the file integrity. You should backup the data to multiple places. To ensuer that the data is accessible in case of emergency it is highly recommended that you follow the 3-2-1 Backup Strategy.  

## [3-2-1 Backup Strategy](https://www.uschamber.com/co/run/technology/3-2-1-backup-rule) 
 - 3 Copies of the Data
 - 2 Different Media Types (HDD, Tape, …)
 - 1 Off-site Copy

Within the LCC Lab, I always keep a copy on the Server, a copy on a Backup Drive, and a copy on AWS Glacier Long-term Tape storage. 

To ensure that the data is stored efficiently, I always like to gzipped-Tarball the files.

## Tar (Tape Archive Format)
Tar is a software program the combines files into a single archive. It was originally developed to backup and store information to tape-based backup systems and is present on Unix/Linux based systems.

Today, Tar has become a standard for combining files and directories.  An alternative that is common to see is ZIP files.


### Common options

| Options | Description |
| ------- | ----------- |
| -c      | Create an Archive | 
| -x      | Extract an Archive |
| -v      | Print versose information |
| -z      | Create Tar file using gzip compression |
| -t      | List all files in the tar archive file |
| -W      | Verify an archive file |
| -u      | Archives file and adds it to existing file |
| -r      | Updates a file or directory located inside a tar archive |

### Archiving

**Usage:**`tar zcvf [archive file].tar.gz  [files/directories]`

**Example:** `tar zcvf test.tar.gz test_directory`

### Extracting

**Usage:**`tar zxvf [archive file].tar.gz`

**Example:** `tar zxvf test.tar.gz`


