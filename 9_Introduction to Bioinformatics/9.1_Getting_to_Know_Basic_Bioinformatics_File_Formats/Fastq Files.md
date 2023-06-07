# 9.1 FASTQ Files  (NGS Sequence Format)
Fastq files were create to record sequence and quality information within a text file.

FASTQ files consist of 4 lines per record:

1. Sequence Identifier with additional information
2. Base Sequences (ACGTN)
3. A Separator (+) - originally this was a copy of the first line
4. Base Quality Score encoding - Uses ASCII characters to encode PHRED quality.

```
@SEQ_ID
GATTTGGGGTTCAAAGCAGTATCGATCAAATAGTAAATCCATTTGTTCAACTCACAGTTT
+
!''*((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>>>>>CCCCCCC65
```

## Sequence Identifiers

### Illumina Sequence Identifiers
The first line of the Illumina FASTQ sequence provide additional information about the which center, machine, flowcell, lane, read, barcode, and additional cluster information.

| Entry | Data | Description |
| ----- | ---- | ----------- |
| 1 | Instrument Name | Unique Name of Instrument |
| 2 | Run ID | Run number on the machine |
| 3 | Flowcell Barcode | Unique Flowcell Barcode |
| 4 | Flowcell Lane | Flowcell Lane Number |
| 5 | Tile Number | Tile number within the Flowcell |
| 6 |  X-coord |X-Coordinate of the cluster tile |
| 7 | Y-coord | Y Coordinate of the cluster tile |
| 8 | Pair Member| Pair number for paired-end or mate-pair only |
| 9 | Filter Status| Y if read was filtered and didn't PASS, N otherwise |
|10 | Control Bits Set | See Illumina Documentation |
|11 | Index Sequence | Sample DNA Barcode used for Multiplexing |

**Template**
`@<Instrument Name>:<Run ID>:<Flowcell Barcode>:<Flowcell Lane>:<Tile Number>:<X-coord>:<Y-coord> <Pair Member>:<Filter Status>:<Control Bits Set>:<Index Sequence>` 

**Actual Header**
`@A00740:683:HY23VDSX5:1:1101:5113:1016 1:N:0:TAGGATGA+CGAGTAAT`

Parsing the actual header:

1. **Instrument Name:**  A00740
2. **Run ID:** 683
3. **Flowcell Barcode:** HY23VDSX5
4. **Flowcell Lane:** 1
5. **Tile Number:** 1101
6. **X-Coord:** 5113
7. **Y-Coord:** 1016
8. **Pair Member:** 1
9. **Filter Status:** N
10. **Control Bit Set:** 0
11. **Index Sequence:** TAGGATGA+CGAGTAAT


## Sequence
There is no limit to the sequence.  Original specifications described possible sequence as `[A-Za-z\n\.~]+`

## Separator
Separator is often just a `+` on a single line.  However, in early FASTQ files it was a copy of the `Sequence Identifier` line, with just `@` replaced by `+`

## Base Quality
Base quality scores are recorded as [Phred Score](https://en.wikipedia.org/wiki/Phred_quality_score) integer values mapped to [ASCII](https://www.asciitable.com/) characters.  The Phred score represents probability that the call was made in error. The smaller the likelihood of an error, the larger the Phred Score.


$$Phred Score = -10 * \log_{10}(P)$$

$$Probability Of Error = 10^\frac{-Phred}{10}$$

| Phred Score | Probability of Error |
| ----------- | -------------------- |
| 1           | 0.79                 |
| 10          | 0.10                 |
| 20          | 0.01                 |
| 30          | 0.001                |
| 40          | 0.0001               |

Now, when you see filtering based on Phred Score, you'll understand what it means.  If you are filtering on Phred score of 20, you should expect that 1 in 100 is going to be a false positive.

### So, how do they get from a Phred Score to a single ASCII character representation.  

Looking at the ASCII character table, you'll notice that the characters represented by 0-32 are typically control characters and not represented by a visible symbol. The character represented by 33 is !.  Utilizing this information, when we see **Phred+33** - we now know that Phred score = 0 is represented by `!`.  

![ASCII Table](https://www.asciitable.com/asciifull.gif)

There are different Phred+ASCII Encodings:  **Phred+64** starts with `@`, the characters with integer value of 64.  A quick and easy way to decipher between **Phred+33** and **Phred+64** is by looking for any of the following characters: `!"#$%&'()*+,-./0123456789:`    (If you see any of these it's not Phred+64)

## Why do we care about any of this?
This basic information is used within downstream pipelines to apply the proper operation of your pipeline, QC and processing of the sequences.

### FASTQ to BAM  (Raw Sequence to Mapped Reads)
When mapping and processing raw sequences reads, we don't actually have any information about where those reads map within the reference genome.  The Variant calling pipelines uses **Read Group** information, which is partially constructed from the FASTQ header, to determine what processes are necessary and in which order.  For example, if you see duplicate reads are they PCR duplicates or independent fragments.  Knowing the **Read Group** information helps to know how this data should be processed.  Since, the **Read Group** information gets embedded into the BAM file you now have a permanent record of the origin of these samples, when it was sequenced, on what machine, a description, sample name, ....

The **Read Group** information is embedded into the alignment files. There are multiple parts of a **Read Group** that are integral to the alignment/map file.

| RG | Description | Required |
| -- | ----------- | -------- |
| ID | Unique Identier for the Reads `<Flowcell Barcode>.<Lane>`| Yes |
| PU | Platform Unit `<Flowcell Barcode>.<Lane>.<Sample Barcode>` | No |
| SM | Sample Name or Identifier | Yes |
| PL | Platform Technology (Illumina/PACBIO/...) | Yes |
| LB | Library - Identify which library sample came from | Yes |
| BC | Barcode Sequence identifying sample or library | No |
| CN | Name of Sequencing Center | No |
| DS | Description | No |
| DT | Date of sequencing | No |
| FO | Flow Order | No |
| KS | Array of nucleotide bases corresponding to the key sequence of each read | No |
| PG | Program used to process the read group | No |
| PI | Predicted Median Insert Size | No |
| PM | Platform Model | No |

Finally, it is always a good idea at the start of a project using FASTQ files to create a table with the Read Group information.  You can then identify any errors or issues that may arise in future processing of the tables.

For example, if you notice that you have two sets of FASTQ files for the same sample but with different Flowcell Barcodes or Lanes.  

 - How would this change how you process these files?
 - Did they come from the same or different library preparations?
 - How is your processing of these samples going to change if they were from the same vs different libraries?  

---

 - [FASTQ Format - Wikipedia](https://en.wikipedia.org/wiki/FASTQ_format)
 - [Phred Scores - Wikipedia](https://en.wikipedia.org/wiki/Phred_quality_score)
 - [ASCII Table](https://www.asciitable.com/)
 - [Illumina FASTQ Files Explained](https://knowledge.illumina.com/software/general/software-general-reference_material-list/000002211)
 - [Illumina FASTQ Format BaseSpace](https://support.illumina.com/help/BaseSpace_OLH_009008/Content/Source/Informatics/BS/FileFormat_FASTQ-files_swBS.htm)
 - [Sequence Alignement/Map File Format (SAM/BAM)](https://samtools.github.io/hts-specs/SAMv1.pdf)
 - [Early 2000's FASTQ Specs](https://maq.sourceforge.net/fastq.shtml)