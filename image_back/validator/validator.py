from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired,ValidationError
import config

def FileSizeLimit(max_size_in_mb):
    max_bytes = max_size_in_mb*1024*1024
    def file_length_check(form, field):
        if len(field.data.read()) > max_bytes:
            raise ValidationError(f"File size must be less than {max_size_in_mb}MB")
        field.data.seek(0)
    return file_length_check

class UploadForm(FlaskForm):
    image = FileField('image', validators=[
        FileRequired(),
        FileAllowed(config.IMAGE_EXTENTIONS, f"only {config.IMAGE_EXTENTIONS} extension can be uploaded"),
        FileSizeLimit(config.IMAGE_SIZE_LIMIT)
    ])
    Authorization=StringField('Authorization',validators=[DataRequired()])