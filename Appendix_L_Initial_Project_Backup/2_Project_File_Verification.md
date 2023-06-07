# Appendix L.2 Project File Integrity Verification

To ensure that your files are exactly as what you think.  You should always verify the file integrity. To verify file integrity, you should use a file [checksum](https://en.wikipedia.org/wiki/Checksum) program. Checksum programs utilize an algorithm to calculate a large integer value from the contents of a file. These are often used in cryptographic software to ensure that correctness of a password or other piece of information without needing to have the actual password or information passed along an insecure channel. While there are many different types (MD5, SHA1, SHA256) of Checksum programs that create a hash from the file contents - the most common checksum program is MD5. 

## MD5 Checksum

MD5 is a bit old and isn't used as much for cryptography, but it's fast and ideal to see if two files have the exact same contents. 

$$ \text{Hello World} \overset{md5}{\longrightarrow} e59ff97941044f85df5297e1c302d260 $$

When you start looking you'll start to see that a lot of programs you download on the internet also have a MD5 checksum listed.  The allows you to verify that some hacker hasn't redirected you to a different file to download.

All filesystems provide [MD5](https://en.wikipedia.org/wiki/MD5) checksum programs to verify file integrity. 

 - MacOS - `md5 <file>`
 - Linux - `md5sum <file>`
 - Windows - `certutil -hashfile <file> MD5`
 
 Alternative Utility: [md5deep](https://md5deep.sourceforge.net/)

 ## Getting the MD5 Checksum of files
Now that you know what the MD5 program is on your system, we can get the MD5 Checksum for the files.

I've created some different files available in this sections **Example Files** folder. Open them up in a text editor and see if you can see the difference between the different files.  Depending on your text editors settings you may not be able to see them at first.

Via command-line - user your MD5 Checksum program to find the MD5 Checksum for all these files - I'm going to be showing it using `md5sum`

### Single File at a time
```
md5sum Test1.txt
md5sum Test2.txt
```

### All Files in a Directory
```
md5sum *.*
```

### All Files (Recursively in sub-directories)
This is where `md5deep` really shines.  It's easy to get all the files in every folder

```
md5deep -rl *
```

**Note:** If you want to save the MD5 checksums to a file, you can redirect the STDOUT output to a file using the `> Filename`

The following command will recursively get the MD5 Checksums for all files and then write them to the MD5Checksum.txt file.  By default MD5deep will output the absolute path, if you only want the relative path use the `-l` option.
```
md5deep -rl * > MD5_Checksum.txt
```

If you want to ensure that only the filenames are output, use the `-b` option.

```
md5deep -rb * > MD5_Checksum.txt
```

## Comparing MD5 Checksums
Once you have the MD5 checksums calculated for all your files, you need to compare the original MD5 to the MD5 checksum you've created.  If you have a small number of files, you can do this by eye.  Otherwise, you can uses some of MD5deep's more advanced options, create a small program to compare hash strings, or import them into Excel and do a Vlookup or other function.

## Taking it further
I would recommend that you take a look at the [MD5deep documentation](https://md5deep.sourceforge.net/md5deep.html) and [Tutorial](https://md5deep.sourceforge.net/start-md5deep.html) for help using it's more sophisticated functions. For example, you can pass it a file of MD5 Checksums and it'll let you know if the MD5 checksums for your files match or don't match depending upon the command-line options you use.
 
