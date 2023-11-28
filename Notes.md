# API Development

## Database Schema

### ntt_recordings - Top level data store. Provides recording info on the full file.
Column Name| Data Type/Size
---|---
objid               | bigint(20)
recording_no        | varchar(10)
recording_date      | date
show_recording_date | datetime
show_date           | varchar(60)
duration            | time
author              | varchar(45)
episode             | int(11)
show_title          | varchar(65)
description         | varchar(255)
source              | varchar(10000)
original_link       | varchar(255)
downloaded          | datetime
file_location       | varchar(255)
file_name           | varchar(255)
rating              | enum('*','**','***','****','*****')
keywords            | varchar(400)
notes               | mediumtext
data_integrity      | char(1)
insert_date         | datetime
last_update         | datetime
top_call            | tinyint(1)
bastiat             | tinyint(1)
missing             | tinyint(1)

### ntt_recordings_regions - Provides data on the various sections derived from the top level files

Column Name| Data Type/Size
---|---
objid          | bigint(20)
recording_id   | bigint(20)
recording_info | varchar(255)
description    | varchar(80)
subject        | varchar(1000)
detail1        | varchar(100)
detail2        | varchar(100)
start_time     | varchar(15)
end_time       | varchar(15)
end_time_post  | varchar(15)
start_edit     | int(1)
edits          | int(11)
edit_note      | varchar(3000)
edit_status    | tinyint(1)
notes          | varchar(500)
rating         | int(2)
keywords       | varchar(3000)