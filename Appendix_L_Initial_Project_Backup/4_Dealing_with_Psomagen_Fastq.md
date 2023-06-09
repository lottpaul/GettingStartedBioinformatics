# Appendix L.4 Dealing with Psomagen Fastq Files
Often times Psomagen will run a sample across multiple lanes or on multiple runs (ie different flowcells), however when they send us the files they concatenate the FASTQ Files together.  This leads to issues downstream in the FASTQ Quality Control and Variant Calling Pipelines.

We must split the FASTQ sequences according to the runs and lanes in order to ensure that the resulting alignments are assigned the correct **Read Group**


**Usage:** `python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --fastq <gzipped FASTQ filename> --output_directory <Output Directory>`


**Example:** `python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --fastq GA-255/GA-255_R1.fastq.gz  --output_directory RG_Checked`

This will create a file in the RG_Checked Folder with the Flowcell Barcode and Lane information added to the filename.  If there aren't multiple read groups in the file the new file will be a symbolic link to the original.  Otherwise, it'll create 2 or more files for the read.

**Example Output:**

1. No extra read groups

`RG_Checked/GA-255_R1_HNCTHDSX2_3.fq.gz`  - would be a symbolic link

2. Multiple Read Groups

`RG_Checked/GA-255_R1_HNCTHDSX2_3.fq.gz` - New file FASTQ from Flowcell HNCTHDSX2 Lane 3
`RG_Checked/GA-255_R1_HX534DSG2_1.fq.gz` - New file FASTQ from Flowcell HX534DSG2 Lane 1



## To automate the process of splitting the read groups, I'd recommend using a simple BASH script

A bash script can be a very simple list of commands that you want to run in the terminal. We can get a list of all the FASTQ Files relative to where 
we'll be running the script


1. Getting the List of all Fastq File in a single file.
Below assumes you have your FASTQ files in some Batch Directory, which has a Sample directory, and containing 2 FASTQ files 

```
ls -1 */*/*.fastq.gz > Script_SplitRG.sh  # will output the fastq files to the file

cat Script_SplitRG.sh

AN1/FD1/FD1_1.fastq.gz
AN1/FD1/FD1_2.fastq.gz
AN1/FD2/FD2_1.fastq.gz
AN1/FD2/FD2_2.fastq.gz
AN2/FD3/FD3_1.fastq.gz
AN2/FD3/FD3_2.fastq.gz
```

2. In a text editor, replace the newline character `\n`, with the following:

Make certain that the replace string ends with a space

```
\npython /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq 
```

This will lead to a text file that now looks like:

```
AN1/FD1/FD1_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD1/FD1_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_2.fastq.gz
```

Now just copy and paste the command to the first one, so it looks like:

```
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD1/FD1_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD1/FD1_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_2.fastq.gz
```

On last thing, when we execute a script in bash, we need to let it know what interpreter to use.  The hashbang/shebang `#!` on the first line of a script tells Unix what interpreter to use. For bash, we can use `#!/bin/bash`.  If it were a python script, we could use `#!/usr/bin/env python3`.  Add `#!/bin/bash` to the first line of the text file and then save it.

```
#!/bin/bash
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD1/FD1_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD1/FD1_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN1/FD2/FD2_2.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_1.fastq.gz
python /share/carvajal-archive/PACKAGES/common-repositories/python/scripts/dna_seq/ValidateFastqReadGroups.py --output_directory RG_Checked -fastq AN2/FD3/FD3_2.fastq.gz
```

3. Executing the Script
In order to execute our script, we need to first make it executable.

```
chmod 775 Script_SplitRG.sh
```

Now we can execute it:

```
./Script_SplitRG.sh
```



Note:  I have also created a Jupyter Notebook that implements this splitting for multiple files.  Please see - 
`/share/carvajal-archive/PACKAGES/common-repositories/python/notebooks/Psomagen_FASTQ_Validation.ipynb`