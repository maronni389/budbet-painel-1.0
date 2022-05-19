import React, { useState } from 'react';
import { Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useActions } from '@redux';
import { uploadTermsAction } from '@redux/upload/actions.js';

const UploadButton = () => {
  const uploadTerms = useActions(uploadTermsAction);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [disabledLink, setDisabledLink] = useState(false);

  const onSuccessUpload = () => {
    setFileList([]);
    setUploading(false);
    message.success('upload feito com sucesso!');
    setTimeout(() => {
      setDisabledLink(false);
    }, 4000);
  };

  const onFailureUpload = () => {
    setUploading(false);
    setDisabledLink(false);
    message.error('Erro no Upload');
  };

  const handleUpload = () => {

    setUploading(true);
    setDisabledLink(true);
    const reader = new FileReader();
    reader.onload = () => {
      const fileType = fileList[0].type;
      const base64 = reader.result.split(',')[1];
      uploadTerms({
        fileType,
        base64,
        onSuccess: () => onSuccessUpload(),
        onFailure: () => onFailureUpload(),
      });
    };
    reader.readAsDataURL(fileList[0]);
  };

  const onRemove = () => {
    setFileList([]);
  };

  const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('O arquivo deve ser do tipo PDF');
      return true;
    }
    const isLessThan = file.size / 1024 / 1024 < 3;
    if (!isLessThan) {
      message.error('O tamanaho tem que ser menor que 3Mb');
      return true;
    }
    setFileList([file]);
    return false;
  };

  return (
    <Col>
      <Row justify="start" style={{ textAlign: 'left' }}>
        <Button
          type="link"
          href={process.env.TERMOS_URL}
          target={process.env.TERMOS_URL}
          style={{ width: 200 }}
          loading={disabledLink}
          disabled={disabledLink}
        >
          Ver termos de uso
        </Button>
      </Row>
      <Row justify="start" style={{ textAlign: 'left' }}>
        <Upload
          onRemove={onRemove}
          beforeUpload={beforeUpload}
          fileList={fileList}
          block
        >
          <Button
            icon={<UploadOutlined />}
            disabled={fileList.length > 0}
            style={{ marginTop: 16, width: 200 }}
          >
            Selecionar Arquivo
          </Button>
        </Upload>
      </Row>
      <Row justify="start">
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16, width: 200 }}
        >
          {uploading ? 'Uploading' : 'Fazer Upload'}
        </Button>
      </Row>
    </Col>
  );
};

export default UploadButton;
