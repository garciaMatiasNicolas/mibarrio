from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib import utils
from notifications.models import Notifications
from fines.models import Fines
import io
import os
from django.conf import settings


class File:
    def __init__(self, object_type: str, pk: int):
        if object_type == "notification":
            self.object_type = Notifications
        elif object_type == "fines":
            self.object_type = Fines
        else:
            raise ValueError("Object type not supported")
        self.pk = pk

    def get_object_data(self):
        try:
            data = self.object_type.objects.get(pk=self.pk)
        except self.object_type.DoesNotExist:
            raise ValueError("Object with the specified pk not found")
        return data

    def generate_pdf(self):
        obj = self.get_object_data()
        file_path = os.path.join(settings.MEDIA_ROOT, 'documents', 'notifications', f'notification_{self.pk}.pdf')

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        if isinstance(obj, Notifications):
            self._generate_notification_pdf(p, obj, width, height)
        elif isinstance(obj, Fines):
            self._generate_fine_pdf(p, obj, width, height)

        p.showPage()
        p.save()

        with open(file_path, 'wb') as f:
            f.write(buffer.getvalue())

        buffer.close()
        return file_path

    def _generate_notification_pdf(self, p, notification, width, height):
        p.setFont("Helvetica-Bold", 20)
        p.drawCentredString(width / 2.0, height - 40, "AVISO DE INFRACCIÓN")

        """if notification.property.neighborhood.logo:
            logo = ImageReader(notification.property.neighborhood.logo)
            p.drawImage(logo, width - 120, height - 80, width=100, preserveAspectRatio=True, mask='auto')"""

        p.setFont("Helvetica", 12)
        p.drawString(30, height - 100, f"FECHA: {notification.due_date.strftime('%d/%m/%Y')}")
        p.drawString(30, height - 120, f"LOTE: LOTE {notification.property.property_number}")
        p.drawString(30, height - 140, f"ENTREGADO A: {notification.property.owner.first_name} {notification.property.owner.last_name}")

        p.line(30, height - 160, width - 30, height - 160)

        self._draw_multiline_text(p, notification.description, 30, height - 180, width - 60)

        if notification.image:
            image = ImageReader(notification.image)
            p.drawImage(image, 30, height - 400, width=200, preserveAspectRatio=True, mask='auto')

        p.drawString(30, height - 420, f"PLAZO DE CORRECCIÓN DE INFRACCIÓN: {notification.term}")
        p.drawString(30, height - 440, f"PENALIDAD: {notification.penalty}")
        p.drawString(30, height - 460, f"OBSERVACIONES: {notification.observations}")

    @staticmethod
    def _draw_multiline_text(p, text, x, y, max_width):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            if p.stringWidth(current_line + word) < max_width:
                current_line += f"{word} "
            else:
                lines.append(current_line)
                current_line = f"{word} "

        lines.append(current_line)

        for line in lines:
            p.drawString(x, y, line)
            y -= 14

    def _generate_fine_pdf(self, p, fine, width, height):
        p.setFont("Helvetica-Bold", 20)
        p.drawCentredString(width / 2.0, height - 40, "FINE DETAILS")
        p.setFont("Helvetica", 12)
        p.drawString(30, height - 100, f"Fine ID: {fine.id}")
        p.drawString(30, height - 120, f"Description: {fine.description}")
        p.drawString(30, height - 140, f"Amount: ${fine.amount}")
        p.drawString(30, height - 160, f"Due Date: {fine.due_date.strftime('%d/%m/%Y')}")

