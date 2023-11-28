# API Development

## Database Schema

The datastore is MySQL using InnoDB format for tables.

### `ntt_recordings` - Top level data store. Provides recording info on the full file.

| Field               | Type                                | Null | Key | Default | Extra          |
|---------------------|-------------------------------------|------|-----|---------|----------------|
| objid               | bigint(20)                          | NO   | PRI | NULL    | auto_increment |
| recording_no        | varchar(10)                         | YES  |     | NULL    |                |
| recording_date      | date                                | YES  | MUL | NULL    |                |
| show_recording_date | datetime                            | YES  |     | NULL    |                |
| show_date           | varchar(60)                         | YES  |     | NULL    |                |
| duration            | time                                | YES  |     | NULL    |                |
| author              | varchar(45)                         | YES  |     | NULL    |                |
| episode             | int(11)                             | YES  |     | NULL    |                |
| show_title          | varchar(65)                         | YES  |     | NULL    |                |
| description         | varchar(255)                        | YES  |     | NULL    |                |
| source              | varchar(10000)                      | YES  |     | NULL    |                |
| original_link       | varchar(255)                        | YES  |     | NULL    |                |
| downloaded          | datetime                            | YES  |     | NULL    |                |
| file_location       | varchar(255)                        | YES  |     | NULL    |                |
| file_name           | varchar(255)                        | YES  |     | NULL    |                |
| rating              | enum('*','**','***','****','*****') | YES  |     | NULL    |                |
| keywords            | varchar(400)                        | YES  |     | NULL    |                |
| notes               | mediumtext                          | YES  |     | NULL    |                |
| data_integrity      | char(1)                             | YES  |     |         |                |
| insert_date         | datetime                            | YES  |     | NULL    |                |
| last_update         | datetime                            | YES  |     | NULL    |                |
| top_call            | tinyint(1)                          | YES  |     | NULL    |                |
| bastiat             | tinyint(1)                          | YES  |     | NULL    |                |
| missing             | tinyint(1)                          | YES  |     | NULL    |                |
| old_file_location   | varchar(255)                        | YES  |     | NULL    |                |
| old_file_name       | varchar(255)                        | YES  |     | NULL    |                

### `ntt_recording_regions` - Provides data on the various sections derived from the top level files

| Field            | Type          | Null | Key | Default | Extra          |
|------------------|---------------|------|-----|---------|----------------|
| objid            | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| recording_id     | bigint(20)    | YES  | MUL | NULL    |                |
| recording_info   | varchar(255)  | YES  |     | NULL    |                |
| description      | varchar(80)   | YES  |     | NULL    |                |
| subject          | varchar(1000) | YES  |     | NULL    |                |
| detail1          | varchar(100)  | YES  |     | NULL    |                |
| detail2          | varchar(100)  | YES  |     | NULL    |                |
| start_time       | varchar(15)   | YES  |     | NULL    |                |
| end_time         | varchar(15)   | YES  |     | NULL    |                |
| end_time_post    | varchar(15)   | YES  |     | NULL    |                |
| start_edit       | int(1)        | YES  |     | NULL    |                |
| edits            | int(11)       | YES  |     | NULL    |                |
| edit_note        | varchar(3000) | YES  |     | NULL    |                |
| edit_status      | tinyint(1)    | YES  |     | NULL    |                |
| notes            | varchar(500)  | YES  |     | NULL    |                |
| rating           | int(2)        | YES  |     | NULL    |                |
| keywords         | varchar(3000) | YES  |     | NULL    |                |
| file_location    | varchar(255)  | YES  |     | NULL    |                |
| file_size_kbytes | double(8,3)   | YES  |     | NULL    |                |

### `ntt_call_knowledge`
| Field              | Type          | Null | Key | Default | Extra          |
|--------------------|---------------|------|-----|---------|----------------|
| objid              | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| source_region      | bigint(20)    | YES  | MUL | NULL    |                |
| source_region_desc | varchar(255)  | YES  |     | NULL    |                |
| knowledge_details  | varchar(3000) | YES  |     | NULL    |                |
| keywords           | varchar(2000) | YES  |     | NULL    |                |

### `ntt_call_qa`
| Field           | Type          | Null | Key | Default | Extra          |
|-----------------|---------------|------|-----|---------|----------------|
| objid           | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| ntt_recording   | bigint(20)    | YES  |     | NULL    |                |
| recording_info  | varchar(100)  | YES  |     | NULL    |                |
| caller_no       | int(11)       | YES  |     | NULL    |                |
| caller_name     | varchar(50)   | YES  |     | NULL    |                |
| caller_location | varchar(50)   | YES  |     | NULL    |                |
| call_time_be    | varchar(10)   | YES  |     | NULL    |                |
| call_time_ae    | varchar(10)   | YES  |     | NULL    |                |
| notes           | varchar(1000) | YES  |     | NULL    |                |

### `ntt_concepts`
| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| objid      | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| entry_date | datetime     | YES  |     | NULL    |                |
| concept    | varchar(255) | YES  |     | NULL    |                |
| notes      | varchar(500) | YES  |     | NULL    |                |

### `ntt_recording_edit_log`
| Field          | Type          | Null | Key | Default | Extra          |
|----------------|---------------|------|-----|---------|----------------|
| objid          | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| recording_id   | bigint(20)    | YES  | MUL | NULL    |                |
| recording_date | date          | YES  |     | NULL    |                |
| edit_start     | datetime      | YES  |     | NULL    |                |
| edit_end       | datetime      | YES  |     | NULL    |                |
| description    | varchar(500)  | YES  |     | NULL    |                |
| notes          | varchar(1000) | YES  |     | NULL    |                |

### `ntt_recording_region_actions`
| Field              | Type          | Null | Key | Default | Extra          |
|--------------------|---------------|------|-----|---------|----------------|
| objid              | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| region_id          | bigint(20)    | YES  | MUL | NULL    |                |
| region_description | varchar(65)   | YES  |     | NULL    |                |
| action_date        | datetime      | YES  |     | NULL    |                |
| action             | varchar(255)  | YES  |     | NULL    |                |
| result             | varchar(3000) | YES  |     | NULL    |                |
| call_length        | varchar(15)   | YES  |     | NULL    |                |
| notes              | varchar(1000) | YES  |     | NULL    |                |

### `ntt_recording_region_notes`
| Field               | Type          | Null | Key | Default | Extra          |
|---------------------|---------------|------|-----|---------|----------------|
| objid               | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| recording_region_id | bigint(20)    | YES  |     | NULL    |                |
| recording_data      | varchar(255)  | YES  |     | NULL    |                |
| note_entry_date     | datetime      | YES  |     | NULL    |                |
| location            | varchar(12)   | YES  |     | NULL    |                |
| note_details        | varchar(5000) | YES  |     | NULL    |                |
| keywords            | varchar(1000) | YES  |     | NULL    |                |

### `ntt_recordings_activity_diary`
| Field             | Type          | Null | Key | Default | Extra          |
|-------------------|---------------|------|-----|---------|----------------|
| objid             | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| entry_date        | datetime      | YES  |     | NULL    |                |
| recording_id      | bigint(20)    | NO   |     | NULL    |                |
| recording_date    | date          | YES  |     | NULL    |                |
| entry_description | varchar(255)  | YES  |     | NULL    |                |
| entry_details     | varchar(5000) | YES  |     | NULL    |                |

### `ntt_recordings_notes`
| Field               | Type         | Null | Key | Default | Extra          |
|---------------------|--------------|------|-----|---------|----------------|
| objid               | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| entry_date          | datetime     | YES  |     | NULL    |                |
| recording_id        | bigint(20)   | YES  | MUL | NULL    |                |
| recording_region_id | bigint(20)   | YES  | MUL | NULL    |                |
| recording_details   | varchar(255) | YES  |     | NULL    |                |
| note_date           | datetime     | YES  |     | NULL    |                |
| note_details        | text         | YES  |     | NULL    |                |
| related_reading     | bigint(20)   | YES  |     | NULL    |                |
| reading_title       | varchar(255) | YES  |     | NULL    |                |

### `ntt_required_reading`
| Field      | Type          | Null | Key | Default | Extra          |
|------------|---------------|------|-----|---------|----------------|
| objid      | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| entry_date | datetime      | YES  |     | NULL    |                |
| title      | varchar(255)  | YES  |     | NULL    |                |
| author     | varchar(255)  | YES  |     | NULL    |                |
| published  | varchar(255)  | YES  |     | NULL    |                |
| notes      | varchar(1000) | YES  |     | NULL    |                |
| source_uri | varchar(255)  | YES  |     | NULL    |                |

### `ntt_show_details`
| Field           | Type          | Null | Key | Default | Extra          |
|-----------------|---------------|------|-----|---------|----------------|
| objid           | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| source_audio_id | bigint(20)    | YES  | MUL | NULL    |                |
| caller_no       | int(11)       | YES  |     | NULL    |                |
| description     | varchar(300)  | YES  |     | NULL    |                |
| audio_length    | char(12)      | YES  |     | NULL    |                |
| subject_matter  | varchar(80)   | YES  |     | NULL    |                |
| caller_name     | varchar(35)   | YES  |     | NULL    |                |
| rating          | int(11)       | YES  |     | NULL    |                |
| notes           | varchar(1000) | YES  |     | NULL    |                |