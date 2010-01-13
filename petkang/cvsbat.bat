@echo On
@Rem É¾³ýCVS°æ±¾¿ØÖÆÄ¿Â¼
@PROMPT [Com]#

@for /r . %%a in (.) do @if exist "%%a\CVS" RD /s/Q "%%a\CVS"

@echo Mission Completed.
@pause
